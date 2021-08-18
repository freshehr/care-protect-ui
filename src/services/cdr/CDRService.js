import axios from 'axios';
import { btoa } from 'abab';
import CDRConfigs from './CDRConfigs.js';

export default class CDRService {
  a;

  // Strips control characters from a Json string
  // Useful for AQL which reads better formatted with newlines, tabs etc.

  constructor(name) {
    if (name !== undefined) {
      this.setActiveCDR(name);
    }
  }

  // from https://gist.github.com/jamischarles/1046671
  static sanitizeJSON = unsanitized => unsanitized.replace(/\s\s+/g, ' ');

  //Returns the formatted Rest URL endpoint
  restUrl = resource => `${this.cdr.url}/rest/v1/${resource}`;

  // Sets the activeCDR to on of the current configs
  setActiveCDR(name) {
    this.cdr = CDRConfigs.find(cdr => cdr.name === name);
  }

  getBasicAuthString(userName, password) {
    return btoa(`${userName}:${password}`);
  }

  getAuthString() {
    return this.getBasicAuthString(this.cdr.username, this.cdr.password);
  }

  async getSessionId() {
    try {
      const response = await axios.post(
        this.restUrl(`session`),
        {},
        {
          params: {
            username: this.cdr.username,
            password: this.cdr.password,
          },
        },
      );
      return response.data.sessionId;
    } catch (e) {
      console.log(e);
    }
  }

  async getAuthHeader() {
    let authHeaderObj;
    if (this.cdr.type === 'ethercis') {
      const sessionToken = await this.getSessionId();
      authHeaderObj = { 'Ehr-Session': sessionToken };
    } else {
      let auth = this.getAuthString();
      authHeaderObj = { Authorization: `Basic ${auth}` };
    }
    return authHeaderObj;
  }

  async listRegisteredTemplates() {
    try {
      const response = await axios.get(this.restUrl(`template`), {
        headers: await this.getAuthHeader(),
      });
      return await response.data.templates;
    } catch (e) {
      console.log(e.message);
    }
  }

  //Performs a simple check of a passed in username and password to see if they satisfy Basic Auth
  async checkLogin() {
    const response = await axios.get(this.restUrl(`template`), {
      headers: { Authorization: `Basic ${this.getBasicAuthString()}` },
    });
    return response.data.templates;
  }

  async createEhr(subjectId, subjectNamespace, otherDetails) {
    try {
      const response = await axios.post(
        this.restUrl(`ehr`),
        otherDetails, // Axios body
        {
          // Axios options
          params: {
            subjectId,
            subjectNamespace,
          },
          headers: await this.getAuthHeader(),
        },
      );
      return response.data.ehrId;
    } catch (e) {
      console.log(e.message);
    }
  }

  async updateEhr(ehrId, otherDetails) {
    try {
      const response = await axios.put(
        this.restUrl(`ehr/status/${ehrId}`),
        otherDetails,
        {
          headers: await this.getAuthHeader(),
        },
      );
      return await response.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  async findEhrBySubjectId(subjectId, subjectNamespace) {
    try {
      const response = await axios.get(this.restUrl(`ehr`), {
        params: {
          subjectId,
          subjectNamespace,
        },
        headers: await this.getAuthHeader(),
      });
      return await response.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  async findEhrIdBySubjectId(subjectId, subjectNamespace) {
    try {
      const ehr = await this.findEhrBySubjectId(subjectId, subjectNamespace);
      return ehr.ehrId;
    } catch (e) {
      console.log(e.message);
    }
  }

  async listEhrs() {
    const aqlString = `SELECT
                            e/ehr_id/value as ehrId, 
                            e/ehr_status/subject/external_ref/id/value as subjectId, 
                            e/ehr_status/subject/external_ref/namespace as subjectNamespace 
                            FROM EHR e`;
    try {
      return await this.runQuery(aqlString);
    } catch (e) {
      console.log(e.message);
    }
  }

  async runQuery(aqlString) {
    const sanitizedAql = CDRService.sanitizeJSON(aqlString);

    try {
      const response = await axios.post(
        this.restUrl(`query`),
        {
          aql: sanitizedAql,
        },
        {
          headers: await this.getAuthHeader(),
        },
      );
      return await response.data.resultSet;
    } catch (e) {
      console.log(e.message);
    }
  }

  async commitComposition(
    ehrId,
    format,
    templateId,
    committerName,
    composition,
  ) {
    try {
      const response = await axios.post(
        this.restUrl(`composition`),
        composition,
        {
          params: {
            ehrId,
            templateId,
            format,
            committerName,
          },
          headers: await this.getAuthHeader(),
        },
      );
      return await response.data.resultSet;
    } catch (e) {
      console.log(e.message);
    }
  }

  async listCompositions(ehrId) {
    let ehr_id_constraint = '';
    if (ehrId !== undefined) ehr_id_constraint = ` [ehr_id/value='${ehrId}']`;

    const aqlString = `SELECT
                            e/ehr_id/value as ehrId, 
                            c/uid/value as compositionId,
                            c/name/value as compositionName 
                            FROM EHR e ${ehr_id_constraint}
                            CONTAINS  COMPOSITION c`;

    try {
      return await this.runQuery(aqlString);
    } catch (e) {
      console.log(e.message);
    }
  }
}
