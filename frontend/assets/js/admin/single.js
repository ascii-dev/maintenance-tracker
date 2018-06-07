const url = '/api/v1/requests';
const requestDiv = document.querySelector('.request-single');
const messageBox = document.querySelector('.message');
const token = localStorage['ascii-mt-token'];

const single = () => {
  const pageUrlArray = document.URL.split('/');
  const pageUrl = pageUrlArray[pageUrlArray.length - 1];
  fetch(`${url}/${pageUrl}`, {
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
        let status;
        switch (message.status) {
          case 1:
            status = '<span class="btn btn-sm btn-orange mb-10 in-review"> In review</span>';
            break;
          case 2:
            status = '<span class="btn btn-sm btn-green mb-10 approved"> Approved</span>';
            break;
          case 3:
            status = '<span class="btn btn-sm btn-red mb-10 disapproved"> Disapproved</span>';
            break;
          default:
            status = '<span class="btn btn-sm btn-green mb-10 resolved"> Resolved</span>';
            break;
        }
        const request = `
        <div class="small-container div-center">
          <h1 class="lead text-center mb-10">${message.title}</h1>
        </div>
        <div class="small-container flex row div-center">
          <div class="card text-center col fit-content">
            <div>
              <p class="mt-10"><strong>Status:</strong> <span class="in-review">${status}</span></p>
              <hr>
              <p class="request-date mt-10"><strong>Created at:</strong> ${new Date(message.created_at).toDateString()}</p>
              <hr>                  
              ${(message.status === 1 || message.status === 3) ? '<a class="btn btn-green btn-full mt-10" onclick="approve(); single();">Accept</a>' : ''}
              ${(message.status === 1) ? '<a class="btn btn-red btn-full mt-10" onclick="disapprove(); single();">Reject</a>' : ''}
              ${(message.status === 2) ? '<a class="btn btn-orange btn-full mt-10" onclick="resolve(); single();">Resolve</a>' : ''}
            </div>
          </div>
          <div class="requests card flex-2">
            <strong>Description:</strong>
            <hr>
            <p class="content mt-10">
              ${message.description}
            </p>
          </div>
        </div>
        `;
        requestDiv.innerHTML = request;
      }
    });
  })
    .catch((err) => {
      console.log(err);
    });
  return null;
};

single();
