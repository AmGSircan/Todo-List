import { v4 as uuidv4 } from 'uuid';

let tasks = [
                {
                    id: uuidv4(),
                    name: 'Làm quen gái',
                    level: 0 //0 small, 1 medium, 2 high
                },
                {
                    id: uuidv4(),
                    name: 'Cưa đổ gái',
                    level: 1
                },
                {
                    id: uuidv4(),
                    name: 'Xin phép bố mẹ vợ',
                    level: 2
                },
                {
                    id: uuidv4(),
                    name: 'Lấy về làm vợ',
                    level: 2
                }
            ]

export default tasks;