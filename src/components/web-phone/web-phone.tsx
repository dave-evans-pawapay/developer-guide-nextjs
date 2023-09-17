'use client'
import {useEffect, useState} from "react";
import uuid4 from "uuid4";
import { DateTime } from "luxon";
export default function WebPhone(props: { phoneAlert: string, receipt: string }){


    const event = new Event('pinComplete');
    const [phoneAlert, setPhoneAlert]=useState(props.phoneAlert);
    const [receipt, setReceipt] = useState( props.receipt);
    const [keyboardOpen, setKeyboardOpen] = useState('');
    const [ counter, setCounter]= useState(0)
    const [pin,setPin] =
        useState(['_','_','_','_']);

    const [dateTime, setDateTime] = useState(DateTime.local());

    window.setInterval(() => {
        setDateTime(DateTime.local());
    },1000);

    useEffect(() => {
        setPhoneAlert(props.phoneAlert);
        if (props.phoneAlert.length > 0) {
            setKeyboardOpen('keyboard_open');
        } else {
            setKeyboardOpen('keyboard_close');
        }
    }, [props.phoneAlert]);

    useEffect(() => {
        setReceipt(props.receipt);
    }, [props.receipt]);
    const numberClick = async (e: any) => {
        const o = Object.assign([], pin);
        // @ts-ignore
        o[counter] = '*';
        console.log(`slot ${counter} is ${e}`);
        setCounter(counter+1);
        setPin(o);
        if (counter === 3) {
            document.dispatchEvent(event);
        }
    };

    const clearReceipt = async () => {
       setReceipt('');
    };
    return (
        <>
            <div className="mt-5">
        <div className="marvel-device s5 white">
            <div className="top-bar"></div>
            <div className="sleep"></div>
            <div className="camera"></div>
            <div className="sensor"></div>
            <div className="speaker"></div>
            <div className="screen">
                <div className="content">
                    <div className="mobile-clock">
                        <div className="time">{dateTime.toLocaleString(DateTime.TIME_SIMPLE)}</div>
                        <div className="date">{dateTime.toLocaleString(DateTime.DATE_SHORT)}</div>
                    </div>
                    {phoneAlert.length > 0 &&  <div className="alert">
                        <div className="alert-string">
                            {phoneAlert}
                        </div>
                        <div className="pin">
                            <div>
                                <div className="number">
                                    {pin[0]}
                                </div>
                            </div>
                            <div>
                                <div className="number">
                                    {pin[1]}
                                </div>
                            </div>
                            <div>
                                <div className="number">
                                    {pin[2]}
                                </div>
                            </div>
                            <div>
                                <div className="number">
                                    {pin[3]}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {receipt.length > 0 && <div className="alert"
                                                onClick={() => clearReceipt()}>
                        receipt
                </div>}
        </div>
        <div className={'keyboard ' + keyboardOpen} >
            <div className="keyboard-row">
            <div className="key" onClick={() => numberClick(1)}>
            <div className="number">
                1
            </div>
            <div className="characters">&nbsp;</div>
        </div>
        <div className="key" onClick={() => numberClick(2)}>
        <div className="number">
            2
        </div>
        <div className="characters">ABC</div>
        </div>
    <div className="key" onClick={() => numberClick(3)}>
        <div className="number">
        3
        </div>
    <div className="characters">DEF</div>
</div>
</div>
            <div className="keyboard-row">
            <div className="key" onClick={() => numberClick(4)}>
                <div className="number">4</div>
                <div className="characters">GHI</div>
            </div>
            <div className="key" onClick={() => numberClick(5)}>
                <div className="number">
        5
        </div>
                <div className="characters">JKL</div>
            </div>
            <div className="key" onClick={() => numberClick(6)}>
                <div className="number">6</div>
                <div className="characters">MNO</div>
            </div>
        </div>
            <div className="keyboard-row">
            <div className="key" onClick={() => numberClick(7)}>
                <div className="number">7</div>
                <div className="characters">PQRS</div>
            </div>
            <div className="key" onClick={() => numberClick(8)}>
                <div className="number">8</div>
                <div className="characters">TUV</div>
            </div>
            <div className="key" onClick={() => numberClick(9)}>
                <div className="number">9</div>
                <div className="characters">WXYZ</div>
            </div>
        </div>
            <div className="keyboard-row">
                <div className="key" >
            <div className="number">
                *
            </div>
        </div>
                <div className="key" onClick={() => numberClick(0)}>
            <div className="number">
                0
            </div>
            <div className="characters">+</div>
        </div>
                <div className="key">
            <div className="number">
                #
            </div>
        </div>
            </div>
        </div></div>
        <div className="home"></div>
    </div>
            </div>
        </>
    )
}
