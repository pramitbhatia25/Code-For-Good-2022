import 'bootstrap/dist/css/bootstrap.min.css';
import "./landing_page.css"
import Header from "../Header"

function LandingPage() {
    return (
        <div>

        <Header />

            <div className='ctop'>
                <div className="card w-75 mx-auto " style={{ background: "linear-gradient(#000080, #000080, #000080, #FFFFFF)" }}>
                    <div className="row">
                        <div className='col-4'>
                            <img src="https://iies.gusec.edu.in/wp-content/uploads/2021/09/GUSEC-Front-PNG.png" alt="gusewwc" width="200" className="card-img-top" />
                        </div>
                        <div className='col-8'>
                            <div id="cardbody" className="card-body">
                                <h5 className="card-title">Welcome to GUSEC.</h5><br />
                                <p className="card-text">Gujarat University Startup and Entrepreneurship Council (GUSEC) is one of India’s leading startup support systems, which has set an unprecedented benchmark by facilitating at zero-cost. Right in the heart of Gujarat University, with an ever-growing infrastructure, 100+ innovative tech and non-tech startups, GUSEC has played a pivotal role in shaping and nurturing the startup ecosystem in Gujarat.</p>
                                <a href="https://gusec.edu.in/" className="btn btn-primary a">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
        </div>
    );
}

export default LandingPage;