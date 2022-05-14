import { makeAutoObservable } from "mobx";

const EventsStore = makeAutoObservable({
    currentId:0,
    events: [
                {
                    id:1,
                    date: '03.05.2022',
                    title: "событие 1"
                },
                {
                    id:2,
                    date: '03.05.2022',
                    title: "событие 2"
                },
                {
                    id:3,
                    date: '03.05.2022',
                    title: "событие 3 "
                },
                {
                    id:4,
                    date: '27.04.2022',
                    title: "событие 4"
                },
                {
                    id:5,
                    date: '28.04.2022',
                    title: "событие 5"
                },
                {
                    id:6,
                    date: '29.04.2022',
                    title: "событие 6"
                },
                {
                    id:7,
                    date: '10.05.2022',
                    title: "событие 7"
                },
              ]

})
export default EventsStore;

// export default class EventsStore {
//     events = [
//         {
//             id:1,
//             date: '03.05.2022',
//             title: "событие 1"
//         },
//         {
//             id:2,
//             date: '03.05.2022',
//             title: "событие 2"
//         },
//         {
//             id:3,
//             date: '03.05.2022',
//             title: "событие 3 "
//         },
//         {
//             id:4,
//             date: '27.04.2022',
//             title: "событие 4"
//         },
//         {
//             id:5,
//             date: '28.04.2022',
//             title: "событие 5"
//         },
//         {
//             id:6,
//             date: '29.04.2022',
//             title: "событие 6"
//         },
//         {
//             id:7,
//             date: '10.05.2022',
//             title: "событие 7"
//         },
//       ]
      
//     count = 777;

//     constructor(){
//         makeAutoObservable(this)
//     }

// }
