import { makeAutoObservable } from "mobx";

const EventsStore = makeAutoObservable({
    currentId:0,
    currentEventId:0,
    name:"",
    currentEvent: new Object(),
})
export default EventsStore;
