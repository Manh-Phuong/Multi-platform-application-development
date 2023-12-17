import React, { useEffect, useState } from 'react';
import moment from 'moment';

// export const TimeAgo = (created) => {
//     const [timeAgo, setTimeAgo] = useState('');

//     useEffect(() => {
//         const calculateTimeAgo = () => {
//             const currentTime = moment();
//             const postTime = moment(created);
//             const duration = moment.duration(currentTime.diff(postTime));

//             if (duration.asMinutes() < 1) {
//                 setTimeAgo('Vừa xong');
//             } else if (duration.asHours() < 24) {
//                 setTimeAgo(`${Math.floor(duration.asHours())} giờ trước`);
//             } else if (duration.asDays() < 7) {
//                 setTimeAgo(`${Math.floor(duration.asDays())} ngày trước`);
//             } else if (duration.asMonths() < 12) {
//                 setTimeAgo(`${Math.floor(duration.asMonths())} tháng trước`);
//             } else {
//                 setTimeAgo(`${Math.floor(duration.asYears())} năm trước`);
//             }
//         };

//         calculateTimeAgo();
//     }, [created]);

//     return timeAgo;
// };

export const calculateTimeAgo = (created) => {
    const currentTime = moment();
    const postTime = moment(created);
    const duration = moment.duration(currentTime.diff(postTime));

    if (duration.asMinutes() < 1) {
        return 'Vừa xong';
    } else if (duration.asHours() < 1) {
        return `${Math.floor(duration.asMinutes())} phút trước`;
    } else if (duration.asHours() < 24) {
        return `${Math.floor(duration.asHours())} giờ trước`;
    } else if (duration.asDays() < 31) {
        return `${Math.floor(duration.asDays())} ngày trước`;
    } else if (duration.asMonths() < 12) {
        return `${Math.floor(duration.asMonths())} tháng trước`;
    } else {
        return `${Math.floor(duration.asYears())} năm trước`;
    }
};

