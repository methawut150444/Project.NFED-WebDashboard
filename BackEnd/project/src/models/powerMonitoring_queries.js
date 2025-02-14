const requestForm = (meter, factor, start, stop) => `
    from(bucket: "Machine_Power_Monitoring")
    |> range(start: ${start}, stop: ${stop})
    |> filter(fn: (r) => r["_measurement"] == "${meter}")
    |> filter(fn: (r) => r["_field"] == "${factor}")
    |> yield(name: "mean")
`;

  
module.exports = { 
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