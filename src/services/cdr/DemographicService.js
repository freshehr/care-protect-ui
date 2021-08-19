import axios from 'axios';

class DemographicService {
  constructor(cdrService) {
    this.cdrService = cdrService;
  }

  async queryPatients(queryParams) {
    try {
      const config = {
        params: queryParams,
        auth: {
          username: this.cdrService.cdr.username,
          password: this.cdrService.cdr.password,
        },
      };
      const response = await axios.get(
        this.cdrService.restUrl('demographics/party/query'),
        config,
      );

      return await response.data.parties;
    } catch (e) {
      console.log(e.message);
    }
  }

  async commitParty(party) {
    try {
      const config = {
        auth: {
          contentType: 'application/json',
          username: this.cdrService.cdr.username,
          password: this.cdrService.cdr.password,
        },
      };
      return await axios.post(
        this.cdrService.restUrl('demographics/party'),
        party,
        config,
      );
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default DemographicService;
