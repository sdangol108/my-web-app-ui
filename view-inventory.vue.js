
 const ViewInventory = {
    template: `
      <div class="float-container">
          <Navigation class="float-child"/>
          
          <div class="float-child">
            <h1>View Inventory</h1>
            <form id="formReservation">
              <div class="field section align-left" style="margin-top:3em">
                <label for="StartdatePicker" class="label-format">Start:</label>
                <input type="date" :value="selectedDateFormatting(startDate)" @input="startDate = $event.target.valueAsDate" name="startDatePicker" />
              </div>
              <div class="field section align-left" style="margin-top:3em">
                <label for="EnddatePicker" class="label-format">Start:</label>
                <input type="date" :value="selectedDateFormatting(endDate)" @input="endDate = $event.target.valueAsDate" name="endDatePicker" />
              </div>
              <div class="field section " style="margin-top:3em">
                <button  type="button" aria-label="Submit" v-on:click="getAllInventory">
                    Submit
                </button>
            </div>
            </form>
            <template v-if="countAvailability"> {{countAvailability}} timeslots are available</template>
            <table>
            <caption>Total availability slots: </caption>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Available slots</th>
                    <th scope="col">Resereved Time</th>
                </tr>
                <tr v-for="(values, key) in datalist" v-bind:key="key">
                <th scope="row">{{ key + 1 }}</th>
                <td v-for="(val, keyCol) in values"  v-bind:key="keyCol">{{ val }}</td>
                </tr>
            </table>

          </div>
      </div>`,
  
    data() {
      return {
          startDate: new Date(),
          endDate: new Date(),
          datalist: null,
          countAvailability: 0,

      };
    },
    methods: {
        async getAllInventory() {

            const requestOptions = {
                url: "http://localhost:8081/api/readInventory.php",
                method: 'GET',
                    params: {
                        startDate: encodeURIComponent(this.selectedDateFormatting(this.startDate)),
                        endDate: encodeURIComponent(this.selectedDateFormatting(this.endDate))
                    }
              };
              axios(requestOptions)
                .then(response => {
                    console.log(response);
                    this.datalist = response.data.body;
                    this.countAvailability = this.datalist.reduce((sum, arr, counter)=> sum += parseInt(arr.reservation_nos), 0 )
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
    }
    
  };
  