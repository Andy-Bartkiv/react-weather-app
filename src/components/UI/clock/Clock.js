import React, { useEffect, useState } from 'react';
import cls from './Clock.module.css'

function Clock() {
	const [date, setDate] = useState(new Date());
	const tick = () => setDate(new Date());

	useEffect( () => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	}, []);

	return (
		<h3 className = { cls.clock }>
			{ date.toLocaleTimeString() }
		</h3>
	)
}

export default Clock;