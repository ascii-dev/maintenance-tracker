import data from '../dummyData/index';

const { requests } = data;

class RequestController {
  // Get all requests from data
  static getAllRequests(req, res) {
    return res.status(200).json({
      allRequests: requests,
      status: 'Success',
      message: 'All requests by user',
    });
  }
}

export default RequestController;
