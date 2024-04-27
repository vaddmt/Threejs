namespace DynamicWindows.Utilities
{
    public static class Colors
    {
        public const int Background = 0xe9ecef;
        public const int Button = 0x343a40;
        public const int ButtonHover = 0x495057;
        public const int ButtonText = 0xced4da;
        public const int ButtonBorder = 0x6c757d;
        public const int Canvas = 0xdee2e6;
        public const int CanvasBorder = 0x212529;
        public const int CanvasTopbar = 0x212529;
        public const int Text = 0xced4da;
        public const int Shadow = 0x212529;

        public static string Hex(int color) => $"#{color:X6}";
    }
}
