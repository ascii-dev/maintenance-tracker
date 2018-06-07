const url = '/api/v1/users/requests';
// const requestsDiv = document.querySelector('.requests');
const messageBox = document.querySelector('.message');
const token = localStorage['ascii-mt-token'];
const form = document.getElementById('modify-form');
const pageUrlArray = document.URL.split('/');
const pageId = pageUrlArray[pageUrlArray.length - 1];

const getRequest = () => {
  fetch(`${url}/${pageId}`, {
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
        const requestForm = `
          <div class="message hide"></div>
          <div class="form-group">
            <label for="request-title">Title</label>
            <input type="text" name="title" id="request-title" class="form-control" placeholder="Enter a title for your request" required="required" value="${message.title}">
          </div>
          <div class="form-group">
            <label for="request-type">Request Type</label>
            <select class="form-control" name="type" id="request-type" required="required">
                <option>Select one</option>
                <option value="maintenance" ${(message.type === 'maintenance') ? 'selected="selected"' : ''}>Maintenance</option>
                <option value="repair" ${(message.type === 'repair') ? 'selected="selected"' : ''}>Repair</option>
            </select>
          </div>
          <div class="form-group">
            <label for="request-description">Description</label>
            <textarea type="text" name="description" id="request-description" class="form-control" placeholder="Describe your request in detail" required="required">${message.description}</textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-green">Submit</button>
          </div>
        `;
        form.innerHTML = requestForm;
      }
    });
  })
    .catch((err) => {
      console.log(err);
    });
  return null;
};

const getFormData = () => {
  const formObject = {};
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    formObject[key] = value;
  }
  return formObject;
};

const modify = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formObject = getFormData();
    fetch(`${url}/${pageId}`, {
      method: 'PUT',
      body: JSON.stringify(formObject),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(formObject);
      if (response.status !== 200) {
        response.json().then((message) => {
          messageBox.classList.add('message-failure');
          messageBox.innerHTML = message.message;
          messageBox.classList.remove('hide');
        });
      } else {
        window.location.href = `/requests/${pageId}`;
      }
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};

getRequest();
modify();
