import React from "react";


const Pricing = () => {

    return (
        <>
            <div class="container">
                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm border-success">
                            <div class="card-header py-3 text-bg-success border-success">
                                <h4 class="my-0 fw-normal">Admin Linux</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title">250000AR</h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                    <li>Connexion pour les pratiques</li>
                                    <li></li>
                                    <li>Projet fin d'etude</li>
                                    <li>Certificat</li>
                                </ul>
                                <a  type="button" class="w-100 btn btn-lg btn-success" href='/inscription'>S'inscrire</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm border-secondary">
                            <div class="card-header py-3 text-bg-secondary border-secondary">
                                <h4 class="my-0 fw-normal">Cyber-secu/ML</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title">400000AR</h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                    <li>Connexion pour les pratiques</li>
                                    <li></li>
                                    <li>Projet fin d'etude</li>
                                    <li>Certificat</li>
                                </ul>
                                <a  type="button" class="w-100 btn btn-lg btn-secondary" href='/inscription'>S'inscrire</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm border-primary">
                            <div class="card-header py-3 text-bg-primary border-primary">
                                <h4 class="my-0 fw-normal">DevOps</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title">500000AR</h1>
                                <ul class="list-unstyled mt-3 mb-4">
                                    <li>Connexion pour les pratiques</li>
                                    <li></li>
                                    <li>Projet fin d'etude</li>
                                    <li>Certificat</li>
                                </ul>
                                <a  type="button" class="w-100 btn btn-lg btn-primary" href='/inscription'>S'inscrire</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pricing;