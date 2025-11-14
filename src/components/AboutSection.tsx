import { Grid, Button } from '@mui/material'
import { About_img } from '../Data/loginRegiter'
import '../Style/AboutSection.css'

export default function AboutSection() {

    return (
        <div className="recipess padtop-20">
            <Grid container spacing={5}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <div className="about-flex">
                        <h1 className="title orangish">What Are We About</h1>
                        <p className="ternary "><span className='title fa-6'>Recipe</span> <span className='title finder'>Finder</span> is a place where you can please your soul and tummy with delicious food recepies of all cuisine. And our service is absolutely free. So start exploring now.</p>
                        <Button variant="contained" className="view btn-width ">explore now</Button>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Grid container spacing={2}>
                        {About_img.map((img) => (
                            <Grid size={{ xs: 4, lg: 4 }}>
                                <img src={`../src/assets/${img}`} className='about-img ' />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
