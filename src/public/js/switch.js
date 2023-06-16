const form = document.getElementById('userIDForm')

form.addEventListener('submit', evt => {
    evt.preventDefault()
    let userid = document.getElementsByName('userid')[0].value

    fetch('/api/session/premium/'+userid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result=>result.json())
    .then(json => {
      if (json.status === "success") {
        Swal.fire('Success', 'User membership upgraded!', 'success');
      } else {
        Swal.fire('Error', 'Failed to upgrade user membership: '+ json.error, 'error');
      }
    })
    .catch(function(error) {
      console.log('Error:', error);
      Swal.fire('Error', 'An error occurred while processing your request: ' + json.error, 'error');
    });
  });