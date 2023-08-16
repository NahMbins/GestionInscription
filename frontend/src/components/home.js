import './home.css';
import Card from 'react-bootstrap/Card';
import Footer from './footer';
import Pricing from './pricing';
import Navigation from './nav';

const Home = () => {
  return(
    <>
    <Navigation /> 
      <div className="container-fluid cover mh-100 d-inline-block text-center">
        <h1 className='text-white pt-5'>FORMATION Academy</h1>
        <p className='text-white pt-3'>Des cours dediés specialement pour vous</p>
        <div className="pt-5">
        <a href='/inscription' className="btn btn-success btn-lg bg-opacity-50" size="lg">
          Commencer maintenant
        </a>
        </div>
        
      </div>
      <div className="d-flex justify-content-around p-5">
          <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title>Cyber Security</Card.Title>
            <Card.Text>
            La cybersécurité est la pratique consistant à protéger les ordinateurs, les serveurs, les appareils mobiles, les systèmes électroniques, les réseaux et les données contre les attaques malveillantes. Il est également connu sous le nom de sécurité des technologies de l'information ou de sécurité de l'information électronique. Le terme s'applique à une variété de contextes, de l'entreprise à l'informatique mobile, et peut être divisé en quelques catégories courantes.
            </Card.Text>
            
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title>DevOps</Card.Title>
            <Card.Text>
            DevOps est un ensemble de pratiques et d'outils, ainsi qu'une philosophie culturelle. Son but est d'automatiser et d'intégrer les processus entre les équipes de développement et informatiques. DevOps met l'accent sur l'autonomisation des équipes, la communication et la collaboration transverses ainsi que l'automatisation technologique.
            </Card.Text>
            
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title>Machine learning</Card.Title>
            <Card.Text>
            Le Machine Learning ou apprentissage automatique est un domaine scientifique, et plus particulièrement une sous-catégorie de l’intelligence artificielle. Elle consiste à laisser des algorithmes découvrir des  » patterns « , à savoir des motifs récurrents, dans les ensembles de données. Ces données peuvent être des chiffres, des mots, des images, des statistiques…
            </Card.Text>
            
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title>Admininstration linux</Card.Title>
            <Card.Text>
            Administrateur Systèmes Linux est un professionnel technique spécialisé dans la maintenance et le développement de la technologie d’infrastructure Linux. Il est le lien dans l’entreprise, entre le DSI, l’administrateur réseau, l’administrateur des bases de données et les développeurs.
            Responsable du bon fonctionnement des infrastructures d’une entreprises, il est en charge de de l’installation, du paramétrage, de la mise à jour, de la sauvegarde du serveur dans une organisation.
            </Card.Text>
            
          </Card.Body>
        </Card>

      
    </div>
    <Pricing/>
    <Footer/>

    </>
    

  )
            
    
    
}
export default Home;