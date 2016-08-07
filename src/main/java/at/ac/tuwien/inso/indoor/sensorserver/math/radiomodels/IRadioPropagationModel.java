package at.ac.tuwien.inso.indoor.sensorserver.math.radiomodels;

/**
 * Created by PatrickF on 30.09.2014.
 */
public interface IRadioPropagationModel {
    public double getPathLossDb(double distanceMeter, double frequencyHz,int roomsBetween);
    public double getDistanceInMeter(double pathLossDb, double frequencyHz,int roomsBetween);
}
