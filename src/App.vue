<template>
  <v-app class="app">
    <v-main class="main">
      <v-card>
        <v-tabs v-model="tab" bg-color="teal-accent-3" class="rounded-xl">
          <v-tab value="Home">Home</v-tab>
          <v-tab value="InfoPage">Next</v-tab>
        </v-tabs>
        <!-- ----------------------------------------------------tabs------------------------------------------------------------- -->
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="Home">
              <div class="tabsheet">
                <v-sheet elevation="12" max-width="670" rounded="lg" width="100%" class="sheetInfo" color="grey-lighten-3">
                  <h1 class="headerinfostyles">Credits Analysis</h1>
                  <div class="frominfo">
                    <v-text-field variant="outlined" type="text" v-model="account_id" label="เลขบัญชี"
                      maxlength="10"></v-text-field>
                  </div>
                  <!-- <div>outputเลขบัญชี : {{ account_id }}</div> -->
                  <!-- ----------------------------------------------------ข้อมูลอาชีพ------------------------------------------------------------- -->
                  <v-form @submit.prevent="submitForm">
                    <h2 class="headerinfostyles">ข้อมูลรายได้</h2>
                    <div class="info">
                      <div class="info">
                        <v-select class="frominfo" clearable label="เลือกอาชีพ" v-model="selectedCareer"
                          variant="outlined" style="width: 250px;" :items="careers"></v-select>
                      </div>
                      <v-text-field class="frominfo" type="number" variant="outlined" v-model="income"
                        label="รายได้รวมต่อเดือน" suffix="บาท/เดือน"></v-text-field>
                    </div>
                    <!-- ----------------------------------------------------ข้อมูลรายได้------------------------------------------------------------- -->
                    <!-- <div>outputอาชีพ : {{ selectedCareer }} / outputรายได้ : {{ income }}</div> -->

                    <Text>อายุงาน/อายุกิจการ</Text>
                    <div class="info">
                      <v-text-field class="frominfo" variant="outlined" v-model="yearExperience"
                        label="ปี"></v-text-field>
                      <v-text-field class="frominfo" variant="outlined" v-model="monthExperience"
                        label="เดือน"></v-text-field>
                    </div>
                    <!-- <div>outputอายุงานปี : {{ yearExperience }} / outputอายุงานเดือน : {{ monthExperience }}</div> -->
                    <!-- ---------------------------------------------------อายุงาน/อายุกิจการ-------------------------------------------------------------- -->
                    <h2 class="headerinfostyles">ข้อมูลรายจ่าย</h2>
                    <div class="info">
                      <v-text-field class="frominfo" variant="outlined" v-model="expenses"
                        label="รายจ่ายต่อเดือน(ไม่รวมหนี้)" suffix="บาท/เดือน"></v-text-field>
                    </div>
                    <!-- <div>outputรายจ่ายต่อเดือน(ไม่รวมหนี้) : {{ expenses }}</div> -->
                    <Text>หนี้สิน</Text>
                    <div class="info">
                      <v-text-field class="frominfo" type="number" variant="outlined" v-model="HomeInstallments"
                        label="ค่าผ่อนบ้าน" suffix="บาท/เดือน"></v-text-field>
                      <v-text-field class="frominfo" type="number" variant="outlined" v-model="CarInstallments"
                        label="ค่าผ่อนรถ" suffix="บาท/เดือน"></v-text-field>
                      <v-text-field class="frominfo" type="number" variant="outlined" v-model="CreditcardInstallments"
                        label="ค่าบัตรเครดิต" suffix="บาท/เดือน"></v-text-field>
                    </div>
                    <!-- <div>outputค่าผ่อนบ้าน : {{ HomeInstallments }} / outputค่าผ่อนรถ : {{ CarInstallments }}
                      / outputค่าบัตรเครดิต : {{ CreditcardInstallments }}</div> -->
                    <!-- -----------------------------------------------------ข้อมูลรายจ่าย--------------------------------------------------------------- -->
                    <h2 class="headerinfostyles">ข้อมูลสินเชื่อ</h2>
                    <Text>เลือกวงเงิน</Text>
                    <v-slider v-model="Limit" class="Limit" :max="max" :min="min" hide-details :step="20000">
                      <template v-slot:append>
                        <v-text-field variant="outlined" v-model="Limit" hide-details single-line density="compact"
                          style="width: 150px" suffix="บาท"></v-text-field>
                      </template>
                    </v-slider>
                    <!-- <div>outputวงเงิน : {{ Limit }}</div> -->
                    <div class="frominfo">
                      <v-select clearable label="เลือกระยะเวลาในการผ่อน(เดือน)" v-model="InstallmentsPeriod"
                        variant="outlined" :items="[24, 36, 48, 60]"></v-select>
                    </div>
                    <!-- <div>outputระยะเวลาในการผ่อน : {{ InstallmentsPeriod }}</div> -->
                    <!-- -----------------------------------------------------ข้อมูลสินเชื่อ--------------------------------------------------------------- -->
                    <center>
                      <v-btn block class="text-none mb-4 rounded-xl" color="teal-accent-3" size="x-large" variant="flat"
                        @click="connectapiAccountID">
                        บันทึก
                      </v-btn>
                    </center>
                  </v-form>
                </v-sheet>
              </div>
              <!-- ----------------------------------------------------tab1------------------------------------------------------------- -->
            </v-window-item>

            <v-window-item value="InfoPage">
              <div class="tabsheet">
                <v-sheet elevation="12" max-width="670" rounded="lg" width="100%" class="sheetInfo">
                  <h1 class="headerinfostyles">ข้อมูลส่วนตัว</h1>
                  <div class="info">
                    <v-text-field variant="outlined" label="ชื่อ" v-model="user.Firstname"
                      class="frominfo"></v-text-field>
                    <v-text-field variant="outlined" label="นามสกุล" v-model="user.Lastname"
                      class="frominfo"></v-text-field>
                    <v-text-field variant="outlined" label="สัญชาติ" v-model="user.national"
                      class="frominfo"></v-text-field>
                  </div>
                  <div class="info">
                    <v-text-field variant="outlined" label="รหัสบัตรประชาชน" v-model="user.ID"
                      class="frominfo"></v-text-field>
                    <v-text-field variant="outlined" class="frominfo">วันเกิด: {{ formatBirthday(user.Birthday)
                    }}</v-text-field>
                  </div>
                  <div class="info">
                    <v-text-field variant="outlined" label="อายุ" v-model="user.Age" class="frominfo"></v-text-field>
                    <v-text-field variant="outlined" label="ระดับการศึกษา" v-model="user.Education"
                      class="frominfo"></v-text-field>
                    <v-text-field variant="outlined" label="สถานะ" v-model="user.Status" class="frominfo"></v-text-field>
                  </div>
                  <v-text-field variant="outlined" label="ที่อยู่ตามบัตรประชาชน" v-model="user.Address"
                    class="frominfo"></v-text-field>
                  <div>
                    <h1 class="headerinfostyles">ช่องทางการติดต่อ</h1>
                  </div>
                  <div class="info">
                    <v-text-field variant="outlined" label="อีเมล" v-model="user.Email" class="frominfo"></v-text-field>
                    <v-text-field variant="outlined" label="เบอร์โทรศัพท์" v-model="user.Phone"
                      class="frominfo"></v-text-field>
                  </div>
                  <div>
                    <v-dialog width="450">
                      <template v-slot:activator="{ props }">
                        <center>
                          <v-btn @click="Confirm" v-bind="props" text="Open Dialog" width="100%" size="x-large"
                            variant="flat" class="rounded-xl" color="teal-accent-3"> ส่งคำขอ </v-btn>
                        </center>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card>
                          <center>
                            <h1 class="dialogHeader">สินเชื่อเพื่อนเปี๊ยก</h1>
                          </center>
                          <div v-if="dialogScore">
                            <center>
                              <v-icon color="success" icon="mdi-check-circle" size="100px"></v-icon>
                              <h2>สินเชื่อของคุณได้รับการอนุมัติแล้ว</h2>
                            </center>
                            <v-card-text class="dialogBox">
                              <div>
                                <h2 style="margin-bottom: 10px;">รายการอนุมัติ</h2>
                                <p class="dialogStyle">ประเภทสินเชื่อ : สินเชื่อส่วนบุคคล</p>
                                <p class="dialogStyle">เลขที่บัญชีธนาคาร : {{ account_id }}</p>
                                <p class="dialogStyle">วงเงิน : {{ Limit }} บาท</p>
                                <p class="dialogStyle">ระยะเวลาผ่อนชำระ(เดือน) : {{ InstallmentsPeriod }}</p>
                                <p class="dialogStyle">อัตราดอกเบี้ย(ต่อปี) : 25.00 %</p>
                                <p class="dialogStyle">ยอดชำระต่อเดือน : {{ mountPayment }}</p>
                              </div>
                            </v-card-text>



                          </div>
                          <div v-else>
                            <center><v-icon color="error" icon="mdi-alert-circle" size="100px"></v-icon></center>
                            <center>
                              <h2 style="margin-bottom: 10px; color: red">การสมัครสินเชื่อเพื่อนเปี๊ยก</h2>
                              <p style="color: red;">ของคุณไม่ผ่านการอนุมัติเนื่องจากไม่ผ่านเกณฑ์ที่กำหนด</p>
                            </center>
                            <v-card-text class="dialogBoxerror">
                              <div>
                                <h2 style="margin-bottom: 10px;">หลักเกณฑ์</h2>
                                <p class="dialogStyle">คะแนนความอยู่รอดต่อเดือน : {{ pointSurRatio }}</p>
                                <p class="dialogStyle">คะแนนความสามารถในการชำระหนี้ : {{ pointAffordRatio }}</p>
                                <p class="dialogStyle">คะแนนอาชีพ อาชีพ : {{ pointCareer }}</p>
                                <p class="dialogStyle">คะแนนอายุการทำงาน : {{ pointExperience }}</p>
                                <p class="dialogStyle">คะแนนความน่าเชื่อถือในการชำระหนี้ก้อนใหม่ : {{
                                  point_financial_ability }}</p>
                                <p class="dialogStyle">คะแนนเครดิต : {{ score }}</p>
                              </div>
                            </v-card-text>
                          </div>

                          <center>
                            <div style="font-size:18px">สอบถามข้อมูลเพิ่มเติมได้ที่มงคลเพื่อนเปี๊ยก <br> เบอร์ 02-xxxxxxx
                            </div>
                          </center>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="ปิด" @click="isActive.value = false" variant="outlined"
                              color="red-accent-3"></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </div>
                </v-sheet>
              </div>
            </v-window-item>
            <!-- ----------------------------------------------------tab2------------------------------------------------------------- -->
          </v-window>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
  <!-- {{ surRatio() }} -->
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

let isUserLoggedIn = ref(true);

const customers = ref([]);
let user
const tab = ref(null);
const account_id = ref('');
const submitted = ref(false);

const selectedCareer = ref(null);
const income = ref(null);
const yearExperience = ref(null);
const monthExperience = ref(null);
const expenses = ref(0);
const HomeInstallments = ref(0);
const CarInstallments = ref(0);
const CreditcardInstallments = ref(0);
const min = ref(10000);
const max = ref(100000);
const Limit = ref(null);
const Limit2 = Limit.toLocaleString()
const InstallmentsPeriod = ref(null);
let brithday = " "
let payment = 0
//point
let pointSurRatio = 0 //คะแนนความอยู่รอด
let pointAffordRatio = 0 // ค่าใช้จ่ายหนี้ในแต่ละเดือน
let pointCareer = 0 // คะแนนอาชีพ
let pointExperience = 0 // คะแนนระยะเวลาการทำงาน
let point_financial_ability = 0 // คะแนนความน่าเชื่อถื่อในการชำระหนี้ก้อนใหม่

let mountPayment = 0
////
const careers = ['พนักงานประจำ', 'ข้าราชการ', 'ธุรกิจส่วนตัว', 'อาชีพอิสระ'];
const dataCustomer = {

}

const surRatio = () => {
  payment = (parseInt(expenses.value, 10) + parseInt(HomeInstallments.value, 10) + parseInt(CarInstallments.value, 10) + parseInt(CreditcardInstallments.value, 10))
  let sumSur = parseInt(income.value, 10) / payment
  console.log("Score", sumSur)
  if (sumSur > 1.5) {
    pointSurRatio = 1
  } else if (sumSur > 1.25) {
    pointSurRatio = 0.75
  } else if (sumSur > 1) {
    pointSurRatio = 0.5
  } else {
    pointSurRatio = 0
  }
  console.log("คะแนนความอยู่รอดต่อเดือน : ", pointSurRatio)
}


const AffordRatio = () => {
  let loan = payment - parseInt(expenses.value, 10)
  let sumAff = (loan / parseInt(income.value, 10)) * 100
  const roundsumAff = Math.round(sumAff)

  if (roundsumAff <= 40) {
    pointAffordRatio = 1
  } else {
    pointAffordRatio = 0
  }
  console.log("คะแนนความสามารถในการชำระหนี้ต่อเดือน : ", pointAffordRatio)
  console.log("ค่าใช้จ่ายเกี่ยวกับหนี้ต่อเดืิอน : ", roundsumAff, "%")
}

const Career = (careers) => {
  const incomeValue = parseInt(income.value);
  let pointCareer = 0; // Initialize pointCareer to 0

  if (careers === 'พนักงานประจำ' && incomeValue >= 12000) {
    pointCareer = 1;
  } else if (careers === 'ข้าราชการ' && incomeValue >= 15000) {
    pointCareer = 1;
  } else if (careers === 'ธุรกิจส่วนตัว' && incomeValue >= 18000) {
    pointCareer = 1;
  } else if (careers === 'อาชีพอิสระ' && incomeValue >= 20000) {
    pointCareer = 1;
  }

  console.log("คะแนนอาชีพ อาชีพ : ", pointCareer);
};

const Experience = () => {
  const ExperienceValue = parseInt(yearExperience.value, 10);
  if (ExperienceValue >= 1 && ExperienceValue < 5) {
    pointExperience = 0.5;
  } else if (ExperienceValue >= 5 && ExperienceValue < 10) {
    pointExperience = 0.75;
  } else if (ExperienceValue > 10) {
    pointExperience = 1;
  }
  console.log("คะแนนอายุการทำงาน : ", pointExperience);
}

const Loan = () => {
  const incomeValue = parseInt(income.value);
  let allLoan = parseInt(HomeInstallments.value, 10) + parseInt(CarInstallments.value, 10) + parseInt(CreditcardInstallments.value, 10)
  let financial_ability = (incomeValue * (40 / 100)) - allLoan
  console.log("ความสามารถชำระหนี้สูงสุด : ", financial_ability);



  let PeriodValue = parseInt(InstallmentsPeriod.value);
  let limitValue = parseInt(Limit.value);


  let interestRate = 0.25 / 12 // ดอกเบี้ยต่อเดือน
  mountPayment = (limitValue * interestRate) / (1 - (1 + interestRate) ** -PeriodValue) // คำนวณยอดผ่อนต่อเดือน
  mountPayment = Math.floor(mountPayment)

  //console.log("ดอกเบี้ย", interestRate);
  //console.log("ยอดชำระต่อเดือน", mountPayment);

  if (financial_ability > mountPayment) {
    point_financial_ability = 1
    mountPayment = mountPayment.toLocaleString();


  }
  console.log("คะแนนความน่าเชื่อถือในการชำระหนี้ก้อนใหม่ : ", point_financial_ability);


}

let dialogScore = ref(false);
let score = 0

const calculateScore = () => {
  score = (point_financial_ability * 35) + (pointAffordRatio * 25) + (pointSurRatio * 20) + (pointExperience * 10) + (pointCareer * 10)
  console.log("คะแนนเครดิต : ", score)
  if (score >= 65) {
    dialogScore = true
    customerLoan()
  }
}

const customerLoan = async () => {
  const userdata = {
    Occupation: selectedCareer.value,
    Payment: expenses.value,
    Loan_amount: Limit.value,
    Installment_period: InstallmentsPeriod.value,
    Account_number: account_id.value,
    income: income.value,
    Home_Installment: HomeInstallments.value,
    Car_Installment: CarInstallments.value,
    CreditCard_Installment: CreditcardInstallments.value
  }

  const respone = await axios.post('https://data-customer-api.onrender.com/api/customer/newloan', userdata)
  console.log('insert OK', respone.data)
}




// const incomeRules = value => (parseFloat(value) > 0) || 'รายได้รวมต่อเดือนต้องมากกว่า 0';
// const yearExperienceRules = value => (parseFloat(value) >= 0) || 'หากประสบการทำงานไม่ถึงปี กรุณาใส่เลข 0';
// const monthExperienceRules = value => (parseFloat(value) >= 0) || 'ต้องมีประสบการทำงานอย่างน้อย 1 เดือน';
// const expensesRules = value => (parseFloat(value) >= 0) || 'รายจ่ายรวมต่อเดือนต้องมากกว่า 0';
// const HomeInstallmentsRules = value => (parseFloat(value) >= 0) || 'หากไม่มี กรุณาใส่เลข 0';
// const CarInstallmentsRules = value => (parseFloat(value) >= 0) || 'หากไม่มี กรุณาใส่เลข 0';
// const CreditcardInstallmentsRules = value => (parseFloat(value) >= 0) || 'หากไม่มี กรุณาใส่เลข 0';
// const InstallmentsPeriodRules = value => (parseFloat(value) > 6) || 'ระยะเวลาในการผ่อนต้องมากกว่า 6 เดือน';
//onst idRules = value => (parseFloat(value) > 0) || 'กรุณากรอกเลขบัญชี';

const submitForm = async () => {
  // You can handle form submission logic here
  // For this example, let's just set submitted to true
  // submitted.value = true;
  // console.log("Submitted!");
  // const response = await axios.get(`https://data-customer-api.onrender.com/api/customer/${account_id.value}`)
  // user = response.data
  // console.log(response.data)

  // const customerLoan = {
  //   accounts_id: account_id.value
  // }

};

const connectapiAccountID = async () => {

  console.log("Submitted!");
  const response = await axios.get(`https://data-customer-api.onrender.com/api/customer/${account_id.value}`)
  user = response.data
  console.log(response.data)
}

const Confirm = async () => {

  surRatio()
  AffordRatio()
  Career(selectedCareer.value)
  Experience()
  Loan()
  calculateScore()


}

const formatBirthday = (birthday) => {
  // Parse and format the birthday
  return new Date(birthday).toISOString().split('T')[0];
}


const connectApi = async () => {

  const response = await axios.get(`https://data-customer-api.onrender.com/api/customer`)
  console.log("ConnectAPINAJA");
  user = response.data
  console.log(response.data)
}
import { watch } from 'vue';

const loading = ref(false)

watch(loading, (val) => {
  if (!val) return
  setTimeout(() => (loading.value = false), 2000)
})


onMounted(async () => {
  connectApi()

  // Fetch data from API
  // fetch(`https://data-customer-api.onrender.com/api/customer/${id}`)
  //   .then(response => response.json())

  //   .then(data => {
  //     customers.value = data; // Assign fetched data to customers array
  //     console.log(customers.value);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });



});
let userData
</script>


<style>
.Header {
  text-align: center;
}

.experience {
  display: flex;
}

.installments {
  display: flex;
}

.Limit {
  padding-left: 5px;
}

.app {
  padding: 30px;
  font-family: Tahoma;
}

.sheetInfo {
  padding: 20px;
  display: flex;
  border-radius: 20px;
}

.infostyles {
  padding: 5px;
  font-size: 20px;
}

.headerinfostyles {
  padding-top: 10px;
  background-color: rgb(179, 179, 179);
  margin-bottom: 10px;
  height: 50px;
  text-align: center;
  justify-content: center;
  display: flex;
  border-radius: 20px;
}

.tabsheet {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;

}

.info {
  display: flex;
}

.frominfo {
  padding: 5px;
  display: flex;
}

.dialogHeader {
  padding: 10px;
  background-color: Green;
  color: white;
}

.dialogBox {
  border: 2px solid rgb(28, 191, 28);
  margin: 15px;
  background-color: rgb(194, 251, 198);

}

.dialogBoxerror {
  border: 2px solid rgb(191, 28, 28);
  margin: 15px;
  background-color: rgb(251, 194, 194);

}

.dialogStyle {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>

