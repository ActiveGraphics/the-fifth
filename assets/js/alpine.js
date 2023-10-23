import Alpine from 'js/cdn';
import axios from 'js/axios.cjs';




window.Alpine.start()
// window.Alpine = Alpine;
// Alpine.start();

window.Alpine.data('nav', () => ({
  open: window.innerWidth > 768,
  size: window.innerWidth,
  resize_handler() {
    this.size = window.innerWidth
    if (this.size < 768) {
      this.open = false
    } else {
      this.open = true
    }
  }
}))

window.Alpine.data('direct_deposit', () => ({
  first_name: '',
  last_name: '',
  x_submit() {
    axios.post('https://api.tsopanakis.com/api/catch/',
      {
        "first_name": this.first_name
      })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  },
  update(e) {
    this[e.srcElement.id] = e.srcElement.value
  }
}))