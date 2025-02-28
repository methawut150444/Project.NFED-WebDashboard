const lastestValue = (meter, factor) => `
    from(bucket: "NFED_Lorawan")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "${meter}")
        |> filter(fn: (r) => r["_field"] == "${factor}")
        |> last()
`

const requestForm = (meter, factor, start, stop) => `
    from(bucket: "NFED_Lorawan")
        |> range(start: ${start}, stop: ${stop})
        |> filter(fn: (r) => r["_measurement"] == "${meter}")
        |> filter(fn: (r) => r["_field"] == "${factor}")
        |> keep(columns: ["_time", "_value"])
        |> sort(columns: ["_time"], desc: true)
        |> limit(n: 1)
`


module.exports = {
    lastestValue,
    requestForm,

};