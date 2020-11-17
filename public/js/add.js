const restaurantForm = document.getElementById('restaurant-form');
const restaurantId = document.getElementById('restaurant-id');
const restaurantName = document.getElementById('restaurant-name');
const restaurantAddress = document.getElementById('restaurant-address');

// Send POST to API to add restaurant
async function addrestaurant(e) {
  e.preventDefault();

  if (restaurantId.value === '' || restaurantAddress.value === '') {
    alert('Please fill in fields');
  }

  const sendBody = {
    restaurantId: restaurantId.value,
    name: restaurantName.value,
    address: restaurantAddress.value
  };

  try {
    const res = await fetch('/api/v1/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Restaurant already exists!');
    }

    alert('Restaurant added!');
    window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

restaurantForm.addEventListener('submit', addrestaurant);