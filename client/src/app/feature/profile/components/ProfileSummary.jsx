import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ProfileSummary extends Component {
    render() {
        return (
            <div>
                summary
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSummary)
