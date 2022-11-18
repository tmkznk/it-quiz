const Layout = ({children}) => {   
    return (
        <>
            <div className="wrapper">
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>

                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 text-center">
                                © tmkznk 2022. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            
            
        </>
        
    )
}

export default Layout