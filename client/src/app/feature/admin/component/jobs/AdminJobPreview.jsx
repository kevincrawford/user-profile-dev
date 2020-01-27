import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AdminJobPreview extends Component {
    render() {
        return (
            <div>
                job preview
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminJobPreview)
