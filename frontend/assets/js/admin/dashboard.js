const url = '/api/v1/requests';
const requestsDiv = document.querySelector('.requests');
const token = localStorage['ascii-mt-token'];
const messageBox = document.querySelector('.message');

const dashboard = () => {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'same-origin',
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
      } else {
        let requests = '';
        if (message.requests.length === 0) {
          requests += 'No requests created yet';
        } else {
          message.requests.forEach((request) => {
            requests += `
                        <div class="mt-10 request flex space-between mb-10 col">
                          <div class="flex-2">
                            <h3 class="title"><strong>Title: </strong>${request.title}</h3>
                            <p><strong>Description: </strong>${request.description.substring(0, 150)}</p>
                            <!-- <p><strong>By: </strong> Samuel Afolaranmi</p> -->
                            <p><strong>Created at: </strong> ${new Date(request.created_at).toDateString()}</p>
                          </div>
                          <a href="#" class="btn btn-green fit-content">View Request</a>
                        </div>
                        <hr>
                        `;
          });
        }
        requestsDiv.innerHTML = requests;
      }
    });
  })
    .catch((err) => {
      console.log(err);
    });
  return null;
};

dashboard();
