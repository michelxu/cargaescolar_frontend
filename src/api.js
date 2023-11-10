const BASE_URL = 'http://localhost:8090/carga-escolar/api';

/* Esta función principal hace la petición Http,
para cualquier acción CRUD (GET, PUT, POST, DELETE)
*/
async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (options.method === 'DELETE') {
      return true;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getItems(endpoint) {
  const url = `${BASE_URL}/${endpoint}`;
  return fetchData(url);
}

export async function createItem(endpoint, itemData) {
  const url = `${BASE_URL}/${endpoint}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  };
  return fetchData(url, options);
}

export async function updateItem(endpoint, itemId, itemData) {
  const url = `${BASE_URL}/${endpoint}/${itemId}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  };
  return fetchData(url, options);
}

export async function deleteItem(endpoint, itemId) {
  const url = `${BASE_URL}/${endpoint}/${itemId}`;
  const options = {
    method: 'DELETE',
  };
  return fetchData(url, options);
}
