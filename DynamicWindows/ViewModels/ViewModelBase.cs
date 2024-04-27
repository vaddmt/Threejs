namespace DynamicWindows.ViewModels
{
    public abstract class ViewModelBase<DATACONTEXT>
    {
        protected DATACONTEXT? _context;

        public DATACONTEXT? Context
        {
            get => _context;
            set
            {
                _context = value;
                OnContextChanged(_context);
            }
        }

        public ViewModelBase(DATACONTEXT? context)
        {
            Context = context;
        }

        public abstract void OnContextChanged(DATACONTEXT? context);
    }
}
