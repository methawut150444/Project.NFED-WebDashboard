const Main_AED_inMonth = (start) => `
    import "array"

    first_value = from(bucket: "Machine_Power_Monitoring")
        |> range(start: ${start}, stop: now())
        |> filter(fn: (r) => r["_measurement"] == "Powermeter_Main" and r["_field"] == "Total_Active_Energy")
        |> first()
        |> keep(columns: ["_value"])
        |> findRecord(fn: (key) => true, idx: 0)

        last_value = from(bucket: "Machine_Power_Monitoring")
        |> range(start: ${start}, stop: now())
        |> filter(fn: (r) => r["_measurement"] == "Powermeter_Main" and r["_field"] == "Total_Active_Energy")
        |> last()
        |> keep(columns: ["_value"])
        |> findRecord(fn: (key) => true, idx: 0)

    diff = last_value._value - first_value._value

    array.from(rows: [{ _measurement: "Powermeter_Main", _first: first_value._value, _last: last_value._value, _diff: diff }])
`

const Main_Power_inDay = (start) => `
    first_points = from(bucket: "Machine_Power_Monitoring")
        |> range(start: ${start}, stop: now())
        |> filter(fn: (r) => r["_measurement"] == "Powermeter_Main")
        |> filter(fn: (r) => r["_field"] == "Total_Active_Energy")
        |> aggregateWindow(every: 30m, fn: first)
        |> keep(columns: ["_time", "_value"])

    last_points = from(bucket: "Machine_Power_Monitoring")
        |> range(start: ${start}, stop: now())
        |> filter(fn: (r) => r["_measurement"] == "Powermeter_Main")
        |> filter(fn: (r) => r["_field"] == "Total_Active_Energy")
        |> aggregateWindow(every: 30m, fn: last)
        |> fill(value: 0.0)
        |> keep(columns: ["_time", "_value"])

    join(tables: {first: first_points, last: last_points}, on: ["_time"])
        |> map(fn: (r) => ({ time: r._time, value: r._value_last - r._value_first }))
        |> yield(name: "energy_diff")
`

const Main_Power_inYesterday = (start, stop) => `
    first_points = from(bucket: "Machine_Power_Monitoring")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "Powermeter_Main")
        |> filter(fn: (r) => r["_field"] == "Total_Active_Energy")
        |> aggregateWindow(every: 30m, fn: first)
        |> keep(columns: ["_time", "_value"])

    last_points = from(bucket: "Machine_Power_Monitoring")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "Powermeter_Main")
        |> filter(fn: (r) => r["_field"] == "Total_Active_Energy")
        |> aggregateWindow(every: 30m, fn: last)
        |> fill(value: 0.0)
        |> keep(columns: ["_time", "_value"])

    join(tables: {first: first_points, last: last_points}, on: ["_time"])
        |> map(fn: (r) => ({ time: r._time, value: r._value_last - r._value_first }))
        |> yield(name: "energy_diff")
`


const requestForm = (meter, factor, start, stop) => `
from(bucket: "Machine_Power_Monitoring")
    |> range(start: ${start}, stop: ${stop})
    |> filter(fn: (r) => r["_measurement"] == "${meter}")
    |> filter(fn: (r) => r["_field"] == "${factor}")
    |> keep(columns: ["_time", "_value"])
    |> yield(name: "mean")
`


module.exports = {
    Main_AED_inMonth,
    Main_Power_inDay,
    Main_Power_inYesterday,

    requestForm,

};


/*
    Todo: -------------------------------< Data Feature >-------------------------------
        * [measurement]
        - Aircompressor_Power_Meter_1
            ? [field]
            - ACTIVE_ENERGY_DELIVERED
            - ACTIVE_POWER_TOTAL
            - FREQUENCY
            - I_AVG
            - L_N_AVG
            - PF_TOTAL
            - REACTIVE_POWER_TOTAL
            - THD_CURRENT_L1
            - THD_CURRENT_L2
            - THD_CURRENT_L3
            - THD_VOLTAGE_L1_N
            - THD_VOLTAGE_L2_N
            - THD_VOLTAGE_L3_N

        * [measurement]
        - Hall_Power_Meter_1
        - Hall_Power_Meter_2
        - Hall_Power_Meter_3
        - Hall_Power_Meter_4
        - Hall_Power_Meter_5
        - Hall_Power_Meter_6
        - Hall_Power_Meter_7
        - Hall_Power_Meter_8
        - Hall_Power_Meter_9

        * [measurement]
        - CNC_Power_Meter_1
            ? [field]
            - ACTIVE_ENERGY_DELIVERED
            - ACTIVE_POWER_TOTAL
                - ACTIVE_POWER_L1
                - ACTIVE_POWER_L2
                - ACTIVE_POWER_L3
            - APPARENT_ENERGY_DELIVERED_PERMANENT
            - FREQUENCY
            - I1
            - I2
            - I3
            - I_AVG
            - I_N
            - L1_N
            - L2_N
            - L3_N
            - L_N_AVG
            - PF_TOTAL
                - PF_L1
                - PF_L2
                - PF_L3
            - REACTIVE_ENERGY_DELIVERED
            - REACTIVE_POWER_TOTAL
                - REACTIVE_POWER_L1
                - REACTIVE_POWER_L2
                - REACTIVE_POWER_L3
            - THD_CURRENT_L1
            - THD_CURRENT_L2
            - THD_CURRENT_L3
            - THD_CURRENT_N
            - THD_VOLTAGE_L1_N
            - THD_VOLTAGE_L2_N
            - THD_VOLTAGE_L3_N
            - THD_VOLTAGE_N


        * [measurement]
        - CNC_Power_Meter_2
            ? [field]

        * [measurement]
        - CNC_Power_Meter_3
            ? [field]

        * [measurement]
        - CNC_Power_Meter_4
            ? [field]

        * [measurement]
        - CNC_Power_Meter_5
            ? [field]

        * [measurement]
        - CNC_Power_Meter_6
            ? [field]

        * [measurement]
        - CNC_Power_Meter_7
            ? [field]

        * [measurement]
        - CNC_Power_Meter_8
            ? [field]

        * [measurement]
        - CNC_Power_Meter_9
            ? [field]

        * [measurement]
        - Welding_Power_Meter_1
            ? [field]
*/

//     |> filter(fn: (r) => r["_measurement"] == "Aircompressor_Power_Meter_1" or r["_measurement"] == "CNC_Power_Meter_1" or r["_measurement"] == "CNC_Power_Meter_2" or r["_measurement"] == "CNC_Power_Meter_3" or r["_measurement"] == "CNC_Power_Meter_4" or r["_measurement"] == "CNC_Power_Meter_5" or r["_measurement"] == "CNC_Power_Meter_6" or r["_measurement"] == "CNC_Power_Meter_7" or r["_measurement"] == "CNC_Power_Meter_8" or r["_measurement"] == "Hall_Power_Meter_1" or r["_measurement"] == "CNC_Power_Meter_9" or r["_measurement"] == "Hall_Power_Meter_2" or r["_measurement"] == "Hall_Power_Meter_3" or r["_measurement"] == "Hall_Power_Meter_4" or r["_measurement"] == "Hall_Power_Meter_5" or r["_measurement"] == "Hall_Power_Meter_7" or r["_measurement"] == "Hall_Power_Meter_6" or r["_measurement"] == "Hall_Power_Meter_8" or r["_measurement"] == "Hall_Power_Meter_9" or r["_measurement"] == "Welding_Power_Meter_1")


//Powermeter_Main
// Total_Active_Energy