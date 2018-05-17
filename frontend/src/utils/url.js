const path = 'localhost:3000';

const url = {
  get() {
    return `${window.location.protocol}//${path}`;
  }
}

export default url;