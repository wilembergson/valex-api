export default function Error(message: string, status:number){
    throw {message, status}
}