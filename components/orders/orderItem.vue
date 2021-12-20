<template>
  <div>
    <div v-for="product in order.products" :key="product._id">
      <div id="cart-info" class="row">
        <div
          class="imgbox d-flex align-items-center justify-content-center col-3"
        >
          <img :src="product.data.image" class="card-img-top" alt="picture" />
        </div>
        <div class="col-5 my-auto">
          <h5 class="mx-3 py-1 text ">{{ product.data.name }}</h5>
        </div>
        <div class="col-3 my-auto">
          <h5 class="ms-auto me-5 price">
            ${{ fullPrice(product.data.price, product.qty) }}
          </h5>
        </div>
        <div class="col-1 my-auto">
          <h3 class="quantity">x{{ product.qty }}</h3>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-end my-2">
      <div unselectable="on" class="col-3 info" @click="showInfo">
        <b :style="{ color: info ? 'black' : 'grey' }">More info</b>
        <img id="arrow" :src="require('~/assets/arrow.png')" alt="arrow" />
      </div>
    </div>

    <div v-if="info" id="mailing-info" class=" row border-top text-center">
      <div class="col-7 mailing-info">
        <h3 class="my-4 mailing-info__title">Mailing info</h3>
        <div class="d-flex justify-content-center">
          <p class="me-3">
            <b>First name:</b> {{ order.mailingInfo.firstName }}
          </p>
          <p><b>Last name:</b> {{ order.mailingInfo.lastName }}</p>
        </div>
        <div class="d-flex justify-content-center">
          <p><b>Mobile: </b> {{ order.mailingInfo.mobile }}</p>
        </div>
        <div class="d-flex justify-content-center">
          <p class="me-3"><b>Address: </b> {{ order.mailingInfo.address }}</p>
          <p><b>Country: </b> {{ order.mailingInfo.country }}</p>
        </div>
        <div class="d-flex justify-content-center">
          <p class="me-3"><b>City: </b> {{ order.mailingInfo.city }}</p>
          <p><b>Zip: </b> {{ order.mailingInfo.zip }}</p>
        </div>
      </div>
      <div class="col-5 payment-info">
        <h3 class="my-4 mailing-info__title">Payment info</h3>
        <div>
          <p><b>Payment method:</b> {{ order.paymentMethod }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      info: false
    };
  },
  methods: {
    fullPrice(price, qty) {
      return Math.round(price * qty * 100) / 100;
    },
    showInfo() {
      this.info = !this.info;
    }
  }
};
</script>

<style scoped>
#cart-info h5,
h3 {
  font-size: 2rem;
}

#mailing-info p {
  font-size: 1.6rem;
}

.imgbox {
  height: 8rem;
}
.card-img-top {
  max-height: 90%;
  max-width: 90%;
  width: auto;
  height: auto;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.quantity,
.text,
.price {
  font-weight: 600;
}

.price {
  color: rgb(22, 202, 22);
}

.info {
  cursor: pointer;
  user-select: none;
}

#arrow {
  width: 15px;
  height: auto;
}

.mailing-info__title {
  font-size: 2rem;
  font-weight: 600;
}

.mailing-info, .payment-info {
  font-weight: 300;
}
.mailing-info b, .payment-info b {
  font-weight: 600;
}
</style>
