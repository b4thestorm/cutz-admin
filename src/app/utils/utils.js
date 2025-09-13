export const BASE_URL = 'http://localhost:8000' 

export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const mapUser = (payload) => {
      return {
        id: payload.id,
        image_url: payload.image_url,
        email: payload.email,
        description: payload.description,
        street_address: payload.street_address,
        city: payload.city,
        state: payload.state,
        zip_code: payload.zip_code,
        first_name: payload.first_name,
        last_name: payload.last_name,
        title: payload.title,
        role: payload.role
      }
}