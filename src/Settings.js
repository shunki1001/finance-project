import { useEffect, useState } from 'react';
import GetList from './components/GetList';
import ChoiceMonth from './components/ChoiceMonth';

const Settings = () => {
    var today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);

    return (
        <div>
            <div>固定費リスト</div>
            <ChoiceMonth month={month} setMonth={setMonth} />
            <GetList collectionName="kotei" month={month} />
        </div>
    );
};

export default Settings;
