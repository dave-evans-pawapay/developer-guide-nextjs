import {useEffect, useState} from "react";
import uuid4 from "uuid4";

export default function WebPhone(props: { phoneAlert: string, receipt: string }){


    const event = new Event('pinComplete');
    const [phoneAlert, setPhoneAlert]=useState(props.phoneAlert);
    const receipt = props.receipt;
    const [keyboardOpen, setKeyboardOpen] = useState('');
    const [ counter, setCounter]= useState(0)
    const [pin,setPin] =
        useState(['_','_','_','_']);

    useEffect(() => {
        if (phoneAlert.length > 0) {
            setKeyboardOpen('keyboard.open');
        } else {
            setKeyboardOpen('');
        }
    }, [phoneAlert]);
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
    return (
        <>
        <div className="marvel-device s5 white">
            <div className="top-bar"></div>
            <div className="sleep"></div>
            <div className="camera"></div>
            <div className="sensor"></div>
            <div className="speaker"></div>
            <div className="screen">
                <div className="content">
                    <div className="mobile-clock">
                        <div className="time"></div>
                        <div className="date"></div>
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
                    {receipt.length > 0 && <div className="alert" >
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
        </>
    )
}
