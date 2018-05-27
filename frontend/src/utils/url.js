const path = 'localhost:3000';
// const path = '192.168.1.248:3000';

const url = {
  get() {
    return `${window.location.protocol}//${path}`;
  }
}

export default url;