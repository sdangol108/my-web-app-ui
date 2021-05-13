
 const Inventory = {
    template: `
    <div class="float-container">
    <Navigation class="float-child"/>
    <div class="float-child">
      <h1> Inventory</h1>
       <form  id="formInventory">
          <fieldset>
          <div class="field section align-left" style="margin-top:3em">
                <label for="StartdatePicker" class="label-format">Start:</label>
                <input type="date" :value="selectedDateFormatting(startDate)" @input="startDate = $event.target.valueAsDate" name="datePicker" />
                <select id="startHours" name="startHour"   @change="changeStartHours($event)" class=" number-setter">
                    <option v-for="hour in startHours" :value="hour" v-model="hour" :key="hour">{{ hour }}</option>
                </select>
                <select id="startMinutes" name="startMinutes"   @change="changeStartMinutes($event)"class="number-setter">
                    <option v-for="startMinute in startMinutes" :value="startMinute" v-model="startMinute" :key="startMinute">{{ startMinute }}</option>
                </select>
            </div>
            <div class="field section align-left" style="margin-top:3em">
                <label for="endDatePicker" class="label-format">End:</label>
                <input type="date" :value="selectedDateFormatting(endDate)" @input="endDate = $event.target.valueAsDate" name="datePicker" />
                <select id="endHours" name="endHours"   @change="changeEndHours($event)" class=" number-setter">
                    <option v-for="endHour in endHours" :value="endHour" v-model="endHour" :key="endHour">{{ endHour }}</option>
                </select>
                <select id="endMinutes" name="minutes"   @change="changeEndMinutes($event)"class="number-setter">
                    <option v-for="endMinute in endMinutes" :value="endMinute" v-model="endMinute" :key="endMinute">{{ endMinute }}</option>
                </select>
            </div>
            <div class="field section align-left" style="margin-top:3em">
                <label for="reservationNos" class="label-format"> Reservation nos: </label>
                <input type="number"  v-model="reservationNos"  name="reservationNos" />

            </div>
            <div class="field section " style="margin-top:3em">
                <button  type="button" aria-label="Submit" v-on:click="createInventory">
                    Submit
                </button>
            </div>
          </fieldset>
          <div class="section">
                <i v-if="createSuccess">{{createSuccess}}</i>
                <i v-else>Enter the information</i>
        </div>
        </form>

    </div>
</div>`,
  
    data() {
      return {
        createSuccess: '',
        hours: Array.from(Array(23),(x,i)=>i),
        minutes: [0, 15, 30, 45],
        selectedStartHours: 0,
        selectedStartMinutes: 0,
        startDate: new Date(),
        endDate: new Date(),
        startHours: Array.from(Array(23),(x,i)=> ("0" + (i+1)).slice(-2)),
        endHours: Array.from(Array(23),(x,i)=> ("0" + (i+1)).slice(-2)),
        startMinutes: ["00", 15, 30, 45],
        endMinutes: ["00", 15, 30, 45],
        reservationNos: 0,
        selectedStartHour: "01",
        selectedEndHour: "23",
        selectedStartMinutes: "00",
        selectedEndMinutes: "00",
      };
    },
    mounted() {
    },
    methods: {
        changeStartHours(event) {
            this.selectedStartHour = event.target.options[event.target.options.selectedIndex].text;
        },
        changeStartMinutes(event) {
            this.selectedEndMinutes = event.target.options[event.target.options.selectedIndex].text;
        },


        changeEndHours(event) {
            this.selectedEndHour = event.target.options[event.target.options.selectedIndex].text;
        },
        changeEndMinutes(event) {
            this.selectedStartMinutes = event.target.options[event.target.options.selectedIndex].text;
        },
        async createInventory() {

            const bodyDAta =JSON.stringify({ 
                start_time: this.selectedDateFormatting(this.startDate) + ' ' + this.selectedStartHour + ':' + this.selectedStartMinutes+ ':' + '00',
                end_time: this.selectedDateFormatting(this.endDate) + ' ' + this.selectedEndHour + ':' + this.selectedEndMinutes+ ':' + '00',
                reservation_nos: this.reservationNos,
            });
            const requestOptions = {
                url: "http://localhost:8081/api/createInventory.php",
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                data: bodyDAta
              };
              axios(requestOptions)
                .then(response => {
                    console.log(response);
                    this.createSuccess = response.data.message;
                }).catch(
                    function (error) {
                      console.log('Error while saving')
                      return Promise.reject(error)
                    }
                  );

        },
        selectedDateFormatting(d) {
            return d && new Date(d.getTime()-(d.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]
        }
        
    },
  };
  