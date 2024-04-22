import { CSpinner } from '@coreui/react';


const Spinner = () => {

    return (

        <div className="d-flex justify-content-center align-items-center" style={{ "marginTop": "20%" }}>
            <CSpinner color="success" size="sm" style={{ width: '4rem', height: '4rem' }} />
        </div>
    );

};

export default Spinner;