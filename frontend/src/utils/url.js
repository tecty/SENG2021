const path = 'localhost:3000';
// const path = '172.20.10.3:3000';

const url = {
  get() {
    return `${window.location.protocol}//${path}`;
  }
}

export default url;