import axios from "axios";

export async function redirectToPaymnetWithId(id: string): Promise<void> {
    const respons = await axios.get('https://sessionapi.tycho.dev/Payment/' + id)
    window.location.replace(respons.data)
  }
