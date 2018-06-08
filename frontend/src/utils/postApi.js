import Cookies from 'js-cookie';
const url = 'http://127.0.0.1:8000/api/v1/';

const postApi = {
  newPost(title, desctription, location, tags, photos) {
    const tags_data = tags.map(tag => {
      return {name: tag}
    })
    const photos_data = photos.map(photo => {
      return {name: photo}
    })
    // console.log(tags_data)
    console.log(photos_data)
    const token = Cookies.get('token');
    // console.log(location)
    const lat = location.lat;
    const lng = location.lng;
    return fetch(`${url}post/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        title: title,
        detail: desctription,
        location: {
          lat: lat,
          lng: lng 
        },
        tag: tags_data,
        photo: photos_data
      })
    }).then(response => {
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      console.log(jsonResponse)
      const success = (jsonResponse.id) ? true : false;
      return {
        success: success,
        id: jsonResponse.id
      } 
    })
  },

  getPostByBound(bound) {
    const urlWithParam = `${url}post/?northeast.latitude=${bound[0].Latitude}&northeast.longitude=${bound[0].Longitude}&southwest.latitude=${bound[1].Latitude}&southwest.longitude=${bound[1].Longitude}`
    return fetch( urlWithParam, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      return response.json()
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      console.log(jsonResponse)
      return jsonResponse.map(post => {
        const tags = post.tag.length > 0 ? post.tag.map(tag => {
          return tag.name
        }) : [];
        const photos = post.photo.length > 0 ? post.photo.map(photo => {
          return photo.name
        }) :[]
        return ( {
          id: post.id,
          position: {
              lat: parseFloat(post.location.lat),
              lng: parseFloat(post.location.lng)
          },
          name: post.title,
          description: post.detail,
          tags: tags,
          pictures: photos,
          author: post.author,
        })
      })
    })
  },

  getPostByUsername(username) {
    return fetch( `${url}post/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      return response.json()
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      console.log(jsonResponse)
      const posts = jsonResponse.filter(post => post.author === username)
      return posts.map(post => {
        const tags = post.tag.length > 0 ? post.tag.map(tag => {
          return tag.name
        }) : [];
        const photos = post.photo.length > 0 ? post.photo.map(photo => {
          return photo.name
        }) :[]
        return ( {
          id: post.id,
          position: {
              lat: parseFloat(post.location.lat),
              lng: parseFloat(post.location.lng)
          },
          name: post.title,
          description: post.detail,
          tags: tags,
          pictures: photos,
          author: post.author,
        })
      })
    }) 
  },

  deletePostById(id) {
    const token = Cookies.get('token');
    return fetch( `${url}post/${id}/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
    })
  },

  editPostById(id, title, desctription, location, tags, photos) {
    const token = Cookies.get('token');
    const tags_data = tags.map(tag => {
      return {name: tag}
    })
    const photos_data = photos.map(photo => {
      return {name: photo}
    })
    const lat = location.lat;
    const lng = location.lng;
    return fetch( `${url}post/${id}/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        title: title,
        detail: desctription,
        location: {
          lat: lat,
          lng: lng 
        },
        tag: tags_data,
        photo: photos_data
      })
    }).then(response => {
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      console.log(jsonResponse)
      const success = (jsonResponse.id) ? true : false;
      return {
        success: success,
        id: jsonResponse.id
      } 
    })
  },
}

export default postApi;