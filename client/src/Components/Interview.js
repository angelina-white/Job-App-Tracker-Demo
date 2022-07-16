import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useEffect } from 'react'
import { gsap } from "gsap";

function Interview({ interviewList })
{
    //handles dates for calendar
    const locales = {'en-US': enUS }
      
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    //style for calendar
    function eventStyleGetter(event, start, end, isSelected) 
    {
        var backgroundColor = "#C8E0DD"
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
            };

        return {
            style: style
        }
    };

    //gets list of interviews for calendar
    const interviewEvents = interviewList.map((item) =>
    {
        return (
            {
                title: item.job.company,
                start: new Date(item.year, (item.month - 1), item.day, item.hour, item.minute),
                end: new Date(item.year, (item.month - 1), item.day, (item.hour + 1), (item.minute)),
                isTranspo: true
            }
        )
    })

    //fade in page
    useEffect(() =>
    {
        gsap.from("#calendar", {delay: .3, duration: 1, opacity: 0, y: 10});
    }, [])

    return (
        <div className="interview">
            <div id="calendar">
                <Calendar
                    localizer={localizer}
                    events={interviewEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 535, width: 1350 }}
                    eventPropGetter={(eventStyleGetter)}
                />
            </div>
        </div>
    )
}
export default Interview