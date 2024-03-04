import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { RecipeDetailModalProps } from '@/types/recipeType'

export const RecipeDetailModal = ({ recipeDetail, open, onClose }: RecipeDetailModalProps) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{recipeDetail?.title}</DialogTitle>
      <DialogContent>
        <p className="font-semibold text-lg">【Summary】</p>
        <p dangerouslySetInnerHTML={{ __html: recipeDetail?.summary || '' }}></p>
        <br/>
        <p className="font-semibold text-lg">【How To Cook】</p>
        <p dangerouslySetInnerHTML={{ __html: recipeDetail?.instructions || '' }}></p>
        <br/>
        <p className="font-semibold text-lg">【URL】</p>
        <a href={recipeDetail?.sourceUrl} target="_blank" rel="noopener noreferrer">
          {recipeDetail?.sourceUrl}
        </a>
        <br/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};