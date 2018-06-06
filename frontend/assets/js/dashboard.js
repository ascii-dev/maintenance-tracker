const url = '/api/v1/users/requests';
const requestsDiv = document.querySelector('.requests');
const token = localStorage['ascii-mt-token'];

const dashboard = () => {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'same-origin',
  }).then((response) => response.json())
    .then((data) => {
      let requests = '';
      if (data.requests.length === 0) {
        requests += 'No requests created yet';
      } else {
        data.forEach((request) => {
          requests += `<div class="mt-10 request flex space-between mb-10 col">
                        <div class="flex-2">
                          <h3 class="title"><strong>Title: </strong>${request.title}</h3>
                          <p><strong>Description: </strong>${request.title.substring(0, 150)}</p>
                        </div>
                        <a href="view-request.html" class="btn btn-green fit-content">View Request</a>
                      </div>
                      <hr>`;
        });
      }
      requestsDiv.innerHTML = requests;
    })
    .catch((err) => {
      console.log(err);
    });
  return null;
};

dashboard();
