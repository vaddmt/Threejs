namespace DynamicWindows.Utilities
{
    public static class Primitives
    {
        public static Mesh Cube => new Mesh()
        {
            indices = new int[]
            {
                2, 1, 0,
                0, 3, 2,
                4, 5, 6,
                6, 7, 4,
                2, 6, 1,
                1, 6, 5,
                3, 0, 4,
                4, 7, 3,
                1, 5, 0,
                0, 5, 4,
                2, 3, 7,
                7, 6, 2
            },
            vertices = new float[]
            {
                +250, +250, +250,
                -250, +250, +250,
                -250, +250, -250,
                +250, +250, -250,
                +250, -250, +250,
                -250, -250, +250,
                -250, -250, -250,
                +250, -250, -250,
            }
        };
    }

    public class Mesh
    {
        public int[] indices { get; set; } = Array.Empty<int>();
        public float[] vertices { get; set; } = Array.Empty<float>();
    }
}
