/**
 * External Dependencies
 */
import { connect } from 'react-redux';
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { isEditorSidebarPanelOpened } from '../../../store/selectors';
import { toggleGeneralSidebarEditorPanel } from '../../../store/actions';

function TaxonomyPanel( { taxonomy, isOpened, onTogglePanel, children } ) {
	const taxonomyMenuName = get( taxonomy, [ 'labels', 'menu_name' ] );
	if ( ! taxonomyMenuName ) {
		return;
	}
	return (
		<PanelBody
			title={ taxonomyMenuName }
			opened={ isOpened }
			onToggle={ onTogglePanel }
		>
			{ children }
		</PanelBody>
	);
}

export default connect(
	( state, ownProps ) => {
		const slug = get( ownProps.taxonomy, [ 'slug' ] );
		const panelName = slug ? `taxonomy-panel-${ slug }` : '';
		return {
			panelName,
			isOpened: slug ? isEditorSidebarPanelOpened( state, panelName ) : false,
		};
	},
	{
		onTogglePanel( panelName ) {
			return toggleGeneralSidebarEditorPanel( panelName );
		},
	},
	( stateProps, dispatchProps, ownProps ) => {
		return {
			...ownProps,
			isOpened: stateProps.isOpened,
			onTogglePanel() {
				dispatchProps.onTogglePanel( stateProps.panelName );
			},
		};
	},
	{ storeKey: 'edit-post' }
)( TaxonomyPanel );

