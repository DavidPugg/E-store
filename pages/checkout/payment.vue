<template>
  <div class="col-xl-8 offset-xl-2 py-3 page">
    <form @submit.prevent="completeOrder">
      <div class="row mt-5">
        <div class="col-3">
          <h5 class="text-center mb-3 title">Payment method</h5>
          <div>
            <button
              :class="{ selected: paymentInfo.paymentMethod === 'visa' }"
              @click="setPaymentMethod('visa')"
              class="btn btn-sm btn-primary col-12 paymentSelect"
              type="button"
            >
              <img :src="require('~/assets/visa.png')" alt="Visa" class="img" />
            </button>
            <button
              :class="{ selected: paymentInfo.paymentMethod === 'mastercard' }"
              @click="setPaymentMethod('mastercard')"
              class="btn btn-sm btn-primary col-12 my-4 paymentSelect"
              type="button"
            >
              <img
                :src="require('~/assets/mastercard.png')"
                alt="MasterCard"
                class="img"
              />
            </button>
            <button
              :class="{
                selected: paymentInfo.paymentMethod === 'americanexpress'
              }"
              @click="setPaymentMethod('americanexpress')"
              class="btn btn-sm btn-primary col-12 paymentSelect"
              type="button"
            >
              <img
                :src="require('~/assets/americanexpress.png')"
                alt="AmericanExpress"
                class="img"
              />
            </button>
          </div>
        </div>
        <div class="col-9">
          <div class="col">
            <label for="cardNumber" class="form-label">Card number</label>
            <input
              type="number"
              class="form-control"
              placeholder=""
              id="cardNumber"
              v-model="paymentInfo.cardNumber"
            />
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <label for="validUntil" class="form-label">Valid until</label>
              <input
                type="number"
                class="form-control"
                placeholder="mm/yy"
                id="validUntil"
                v-model="paymentInfo.validUntil"
              />
            </div>
            <div class="col-6">
              <label for="securityCode" class="form-label"
                >Security Code (CVC)</label
              >
              <input
                type="number"
                class="form-control"
                placeholder=""
                id="securityCode"
                v-model="paymentInfo.securityCode"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <label for="owner" class="form-label">Card owner</label>
              <input
                type="text"
                class="form-control"
                placeholder=""
                id="owner"
                v-model="paymentInfo.cardOwner"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="d-flex justify-content-start col-6">
          <NuxtLink
            class="btn btn-danger btn-lg mt-3"
            to="/checkout/deliveryInfo"
            >Delivery info</NuxtLink
          >
        </div>
        <div class="d-flex justify-content-end col-6">
          <button class="btn btn-success btn-lg mt-3">
            Payment
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["mailingInfo"],
  data() {
    return {
      paymentInfo: {
        cardNumber: null,
        validUntil: null,
        securityCode: null,
        cardOwner: "",
        paymentMethod: "visa"
      },
      validCardNumber: true,
      validValidUntil: true,
      validSecurityCode: true,
      validCardOwner: true,
      validPaymentMethod: true
    };
  },
  methods: {
    setPaymentMethod(method) {
      this.paymentInfo.paymentMethod = method;
    },
    async completeOrder() {
      const validForm = this.validateInfo();
      if (validForm) {
        await this.$store.dispatch("products/completeOrder", {
          mailingInfo: this.mailingInfo,
          paymentInfo: this.paymentInfo
        });
        this.$router.push("/checkout/thankyou");
      } else {
        this.$store.dispatch("setErrorMessage", "Please input all the info.", {
          root: true
        });
      }
    },
    validateInfo() {
      this.validCardNumber = this.paymentInfo.cardNumber < 1 ? false : true;
      this.validValidUntil = this.paymentInfo.validUntil < 1 ? false : true;
      this.validSecurityCode = this.paymentInfo.securityCode < 1 ? false : true;
      this.validCardOwner =
        this.paymentInfo.cardOwner.length < 1 ? false : true;
      this.validPaymentMethod =
        this.paymentInfo.paymentMethod == "visa" ||
        this.paymentInfo.paymentMethod == "mastercard" ||
        this.paymentInfo.paymentMethod == "americanexpress"
          ? true
          : false;
      if (
        this.validCardNumber &&
        this.validValidUntil &&
        this.validSecurityCode &&
        this.validCardOwner &&
        this.validPaymentMethod
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.page {
  font-size: 1.6rem;
}

.title {
  font-size: 2rem;
  font-weight: 600;
}

.img {
  height: 3rem;
  width: auto;
}
.paymentSelect {
  border-radius: var(--border-radius-small);
  background-color: white;
}
.selected {
  background-color: gainsboro;
}
</style>
