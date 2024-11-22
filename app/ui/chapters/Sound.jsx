"use client"

import { RxSpeakerLoud } from 'react-icons/rx'
import useSound from 'use-sound';

export default function Sound({ audio,id }) {
    const [play] = useSound(`/sounds/${audio}`);

    return (
        <div id={id} role='button' className='cursor-pointer' onClick={() => play()} title='Play sound'>
            <RxSpeakerLoud color="#000000" size={18} />
        </div>
    )
}
