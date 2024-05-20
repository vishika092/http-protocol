import axios from "axios";

axios.get("http://192.168.36.81:8080/vishika/pali")
    .then((res) => {
        console.log(res.data);
    })