import axios from "axios";

export default function useSendData() {
    return async function (data) {
        return await axios.post(`https://0d3f-37-195-146-209.ngrok-free.app/webhook`, data);
    }
}