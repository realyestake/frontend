import React from 'react'
import Details from '../../components/Property/AddANewProperty/Details'
import UploadPage from '@/components/Property/AddANewProperty/UploadPage';
import LinksPage from '@/components/Property/AddANewProperty/LinksPage';
export default function NewProperty() {

    const [step, setStep] = React.useState(0);
    const [data, setData] = React.useState({});

    const incrementStep = () => {   
        setStep(step + 1)
    }
    const decrementStep = (route) => {
        setStep(route)
    }

    const handleSetData = (data) => {
        setData((prevData) => ({...prevData, ...data}));
    }


    const renderItem = () => {
        switch (step) {
            case 0:
                return <Details data={data} setData={handleSetData} incrementStep={incrementStep} decrementStep={decrementStep} activeStep={1}/>
            case 1:
                return <LinksPage data={data} setData={handleSetData} incrementStep={incrementStep} decrementStep={decrementStep} activeStep={2}/>
            case 2:
                return <UploadPage data={data} setData={handleSetData}  incrementStep={incrementStep} decrementStep={decrementStep} activeStep={3}/>
            default:
                return;
        }
    }

    return (
        <>
            {renderItem()}
        </>
    )
}
